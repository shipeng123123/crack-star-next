import {webSocketURL} from './url'
function connectWebSocket() {
    if (typeof WebSocket != 'undefined') {
        const ws = new WebSocket(webSocketURL,'conn' );
        let pingTimer = null;
        ws.addEventListener('open', () => {
            console.log('[webSocket] 连接成功.');
            // 连接成功后发送消息
            ws.send('客户端连接成功');
        });
        ws.addEventListener('message', ({ data }) => {
            const json = JSON.parse(data);
            console.log(json.data);
            // if (json.type === 'console') {
            //     console.log(json.data);
            // }
        });

        ws.addEventListener('close', () => {
            console.info('[webSocket] 关闭.');
        });

        function send(message) {
            // 检查WebSocket状态
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(message);
            } else {
                console.error('WebSocket 异常.');
            }
        }

        return {
            send,
            close: () => {
                ws.close();
            }
        };
    } else {
        alert("您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！")
        return null;
    }
}
export default connectWebSocket
