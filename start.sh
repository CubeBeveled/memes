start() {
    node index.js
    echo "Restarting..."
    sleep 5
    node index.js
    start
}

start