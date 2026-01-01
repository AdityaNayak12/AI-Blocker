const CODING_SITES = [
    "leetcode.com",
    "codeforces.com",
    "codechef.com",
    "hackerrank.com",
    "atcoder.jp",
    "scaler.com",
    "geeksforgeeks.org"    
];

const AI_SITES = [
    "chat.openai.com",
    "perplexity.ai",
    "google.gemini.com",
    "claude.ai",
];

function matchSites(url, sites){
    return sites.some(site => url.includes(site));
}

async function isCodingTabOpen(params) {
    const tabs = await chrome.tabs.query({});
    return tabs.some(tab => tab.url && matchSites(tab.url, CODING_SITES));
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!changeInfo.url) return;


  if (matchSites(changeInfo.url, AI_SITES)) {
    const codingOpen = await isCodingTabOpen();

    if (codingOpen) {
      chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL("blocked.html")
      });
    }
  }
});

