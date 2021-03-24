module.exports = {
    apps: [{
      name: "app-name",
      watch: true,  
      script: "./server.js",
      // Delay between restart
      watch_delay: 5000,
      ignore_watch : ["node_modules", ".git"],
      watch_options: {
        "followSymlinks": false
      }
    }]
}