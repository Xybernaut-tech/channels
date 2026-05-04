(function() {
    // Generate or retrieve a simple unique session ID for this visitor
    function getSessionId() {
        let sid = localStorage.getItem('aut_session_id');
        if (!sid) {
            sid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('aut_session_id', sid);
        }
        return sid;
    }

    function sendPing() {
        fetch('https://cricdynasty-hits.onrender.com/ping.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session: getSessionId(),
                domain: window.location.hostname,
                path: window.location.pathname,
                ts: Date.now()
            }),
            keepalive: true // Ensures ping sends even if user closes tab
        }).catch(e => console.debug('Tracker ping failed:', e));
    }

    // Send initial ping immediately
    sendPing();

    // Send a heartbeat ping every 20 seconds to keep the session alive
    setInterval(sendPing, 20000);
})();
