const webhookList = document.getElementById("webhookList");
const webhookDetail = document.getElementById("webhookDetail");
const copyBtn = document.getElementById("copyBtn");

let webhooks = [];

function addWebhook(data) {
  const index = webhooks.length;
  webhooks.push(data);

  const item = document.createElement("li");
  item.className = "p-4 cursor-pointer hover:bg-indigo-50";
  item.textContent = `Webhook ${index + 1} - ${new Date().toLocaleTimeString()}`;
  item.onclick = () => showWebhookDetail(index);

  webhookList.prepend(item);
  showWebhookDetail(index); // Laatste automatisch tonen
}

function showWebhookDetail(index) {
  const data = webhooks[index];
  const jsonText = JSON.stringify(data, null, 2);
  webhookDetail.textContent = jsonText;
  copyBtn.classList.remove("hidden");
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(jsonText);
    copyBtn.textContent = "✅ Gekopieerd!";
    setTimeout(() => copyBtn.textContent = "📋 Kopieer JSON", 1500);
  };
}

// Simuleer inkomend webhook-request
setTimeout(() => {
  addWebhook({ message: "Hello from webhook", timestamp: new Date().toISOString() });
}, 1000);

setTimeout(() => {
  addWebhook({ event: "user.created", user: { id: 123, name: "Alice" }, timestamp: new Date().toISOString() });
}, 3000);
