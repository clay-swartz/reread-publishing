export class CoverStream{
  constructor(element, covers, {interval=390}={}){
    this.el=element; this.covers=covers;this.interval=interval;this.current=0;
    this.image=element.querySelector('img');this.motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    this.visible=true;this.timer=null;this.cache=new Map();
    this.onMotion=()=>this.restart();this.motion.addEventListener('change',this.onMotion);
    this.observer=new IntersectionObserver(entries=>{this.visible=entries[0].isIntersecting;this.restart();},{threshold:.1});
    this.observer.observe(element);
    this.load(0).then(()=>this.restart());
  }
  async load(index){
    const cover=this.covers[index%this.covers.length]; if(!cover)return false;
    if(this.cache.has(cover.src))return this.cache.get(cover.src);
    const promise=new Promise(resolve=>{
      const img=new Image();img.onload=()=>resolve(true);img.onerror=()=>resolve(false);img.src=cover.src;
    });
    this.cache.set(cover.src,promise);return promise;
  }
  async next(){
    if(this.motion.matches||!this.visible)return;
    for(let offset=1;offset<=this.covers.length;offset++){
      const index=(this.current+offset)%this.covers.length;
      if(await this.load(index)){
        this.current=index;this.image.src=this.covers[index].src;this.image.alt=this.covers[index].alt;
        this.load((index+1)%this.covers.length);break;
      }
    }
  }
  restart(){
    clearInterval(this.timer);
    if(!this.motion.matches&&this.visible&&this.covers.length>1){
      this.timer=setInterval(()=>this.next(),this.interval);
    }
  }
  destroy(){clearInterval(this.timer);this.observer.disconnect();this.motion.removeEventListener('change',this.onMotion)}
}
