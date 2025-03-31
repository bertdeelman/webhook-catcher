const webhookList = document.getElementById("webhookList");
const webhookDetail = document.getElementById("webhookDetail");
const copyBtn = document.getElementById("copyBtn");

let webhooks = [];

function showWebhookDetail(index) {
  const item = webhooks[index];
  const jsonText = JSON.stringify(item, null, 2);
  webhookDetail.textContent = jsonText;
  copyBtn.classList.remove("hidden");
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(jsonText);
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => copyBtn.textContent = "📋 Copy JSON", 1500);
  };
}

function renderList() {
  webhookList.innerHTML = "";
  webhooks.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "p-4 cursor-pointer hover:bg-[#34495E]";
    li.textContent = `Webhook ${index + 1} - ${new Date(item.timestamp).toLocaleTimeString()}`;
    li.onclick = () => showWebhookDetail(index);
    webhookList.prepend(li);
  });
}

async function fetchWebhooks() {
  const res = await fetch("/api/webhooks");
  const data = await res.json();
  webhooks = data;
  renderList();
  if (webhooks.length > 0) showWebhookDetail(0);
}

fetchWebhooks();
setInterval(fetchWebhooks, 5000);
