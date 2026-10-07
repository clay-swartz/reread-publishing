const archiveItems = [
  {
    className: "item-paper",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wallstreetbombing1920-page-001.jpg",
    alt: "New York Times front page from September 1920",
  },
  {
    className: "item-allstory",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/1913_All_Story_Magazine.jpg",
    alt: "1913 All-Story magazine cover",
  },
  {
    className: "item-mask",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Black_Mask_%28November%2C_1928%29_cover.jpg",
    alt: "1928 Black Mask magazine cover",
  },
  {
    className: "item-adventure",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Adventure_1928-10-15_cover.png",
    alt: "1928 Adventure magazine cover",
  },
];

export default function ArchiveStack({ archiveRef }) {
  return (
    <div className="archive-zone" ref={archiveRef} aria-label="American Myths research material">
      <div className="archive-shadow" aria-hidden="true" />

      {archiveItems.map((item) => (
        <div className={"archive-item " + item.className} key={item.className}>
          <img src={item.src} alt={item.alt} />
        </div>
      ))}

      <div className="research-label">
        <div className="label-top">
          <span>Re:Read research</span>
          <span>001</span>
        </div>
        <div className="label-name">American Myths</div>
        <div className="label-bottom">
          <div className="label-cell">status / searching</div>
          <div className="label-cell">members / invited</div>
        </div>
      </div>
    </div>
  );
}
