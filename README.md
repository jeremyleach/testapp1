# testapp1

# View app live at: https://statuesque-malasada-dd398b.netlify.app/
# Needs node version 20 and up.

# To run locally  
nvm use 20   

npm install 

npm run dev

# To build
npm run build

# NOTES
1. Not using any animation loop, as only state changes caused by interaction or resize. 
2. Shape stroke remains the specified pixel thickness, regardless of zoom level, as behaviour not specified in reqs. Could easily make that include zoom factor.

