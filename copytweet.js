document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (
      !event.target.matches(".stat-clipboard-icon") &&
      !event.target.matches(".stat-twitter-icon")
    )
      return;

    // Don't follow the link
    event.preventDefault();

    //copy to clipboard
    if (event.target.matches(".stat-clipboard-icon")) {
      console.log("copy: ", event.target);

      let listElem = event.target.parentElement.parentElement;
      let iconsDiv = event.target.parentElement;
      let statToCopy = listElem.querySelector(".ss-stat");

      var textArea = document.createElement("textarea");
      textArea.style.position = "absolute";
      textArea.style.opacity = "0";
      textArea.value = statToCopy.innerText + " via Smith.ai, Inc.";
      document.body.appendChild(textArea);
      var range = document.createRange();
      range.selectNode(statToCopy);
      window.getSelection().addRange(range);

      try {
        // Now that we've selected the anchor text, execute the copy command
        textArea.select();
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Copy was " + msg);

        document.body.removeChild(textArea);

        if (successful) {
          iconsDiv.classList.add("copied");

          setTimeout(function () {
            console.log(iconsDiv);
            iconsDiv.className = "stat-share-container";
          }, 1500);
        }
      } catch (err) {
        console.log("Oops, unable to copy");
        console.log(err);
      }
    }

    //share on twitter
    if (event.target.matches(".stat-twitter-icon")) {
      let listElem = event.target.parentElement.parentElement;

      // console.log('listElem: ', listElem);

      let selection = "";
      let stat_source = "";

      // Are there pseudo-bullets in this stat?
      let bullets = listElem.querySelectorAll(".round, .square");

      // innerText works better than textContent as it removes embedded styles and other non-essential text
      selection = listElem.querySelector(".ss-stat").innerText;

      stat_source = listElem.querySelector(".ss-source").innerText;

      // if there's a bullet list, prepend a carriage return
      if (bullets.length > 0) {
        stat_source = "\n - " + stat_source;
      } else {
        // prepend a dash in front of the stat source
        stat_source = " - " + stat_source;
      }

      selection = encodeURIComponent(selection);
      stat_source = encodeURI(stat_source);

      var twitterWindow = window.open(
        "https://twitter.com/share?text=" +
          selection +
          stat_source +
          "&url=" +
          window.location +
          "&via=smithdotai",
        "twitter-popup",
        "height=350,width=600"
      );
      if (twitterWindow.focus) {
        twitterWindow.focus();
      }
      return false;
    }
  },
  false
);
