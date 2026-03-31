// Set the public Google Form URL to show the Feedback link in each tool.
window.APP_FEEDBACK_URL = "https://forms.gle/qmJktxEFcVnhKVeS9";

(function(){
  function applyFeedbackLink(link){
    if (!link) return;

    const href = (window.APP_FEEDBACK_URL || "").trim();
    if (!href) {
      link.hidden = true;
      return;
    }

    link.href = href;
    link.hidden = false;
  }

  function initFeedbackLinks(){
    document.querySelectorAll("[data-feedback-link]").forEach(applyFeedbackLink);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFeedbackLinks, { once: true });
  } else {
    initFeedbackLinks();
  }
})();
