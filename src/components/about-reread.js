class AboutReread extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="season-section" id="season">
        <div class="shell">
          <div class="editorial-rule"><span>01 / THE SEASON</span><span>FIRST SEASON IN DEVELOPMENT</span></div>
          <div class="season-lead">
            <div><p class="season-kicker">THE FIRST INVESTIGATION</p><h2>American<br><em>Myths.</em></h2></div>
            <div class="season-right"><p class="season-deck">People who made themselves. People who invented new lives. The stories America tells—and the ones that got away.</p>
            <p class="season-body">Each Re:Read season takes one theme and follows it into unexpected territory. Two independently published books: one rediscovered work and one wildcard. Different perspectives. A reason to keep reading.</p></div>
          </div>
          <div class="season-bottom"><span>THE REDISCOVERY <b>01</b></span><span>THE WILDCARD <b>02</b></span><span>THE TITLES STAY SECRET UNTIL THE REVEAL.</span></div>
        </div>
      </section>
      <section class="notes-section" id="notes" aria-labelledby="notes-title">
        <div class="shell">
          <div class="editorial-rule"><span>02 / FROM THE DESK</span><span>THE WORK BEHIND THE BOOKS</span></div>
          <div class="notes-layout">
            <div class="notes-picture"><img src="https://www.shorpy.com/files/images/4a17345a1.jpg" loading="lazy" alt="Historical photograph of the Library of Congress reading room, circa 1905"><span>AN ARCHIVE IS A STARTING PLACE, NOT A FINISH LINE.</span></div>
            <div class="notes-copy"><p class="season-kicker">AN OPENING NOTE</p><h2>Old doesn't<br>mean <em>over.</em></h2>
              <p>A book from 1998 can be just as lost as one from 1898. The date matters less than the question: would someone fall in love with it today?</p>
              <p>The search ranges across decades, genres, and formats—from novels that quietly went out of print to stories that never got the audience they deserved.</p>
              <p>Re:Read is currently reading, researching rights, and looking for its first books. No invented catalog. No books announced before they're acquired.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="press-section" id="press">
        <div class="shell press-layout">
          <div class="editorial-rule"><span>03 / THE PRESS</span><span>FOUR SEASONS · TWO BOOKS EACH</span></div>
          <h2>Find what<br>you missed.</h2>
          <div class="press-description"><p>Re:Read publishes collectible individual editions in themed seasons. The rediscovery may be fiction or nonfiction, from any decade. The wildcard might be a new manuscript, a short story, a comic, a novella, or something entirely unexpected.</p><p>The season is revealed first. The books come later. The pleasure is in the discovery.</p></div>
        </div>
      </section>`;
  }
}
customElements.define("about-reread", AboutReread);
