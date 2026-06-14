
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log("🚀 Server LOCALE Metaverse attivo sulla porta 8080");
console.log("💻 Pronto per il test sul browser (admin.html <-> index.html)");

wss.on('connection', function connection(ws) {
    console.log("🔌 Un pannello (Admin o Pilota) si è connesso al server!");

    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        console.log(`📡 Messaggio ricevuto dall'admin:`, data);
        
        // Rispedisce il comando a tutte le pagine aperte
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });
});
