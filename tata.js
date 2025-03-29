  
  function initIPLPopup() {
    // Create style element
    const style = document.createElement('style');
    style.textContent = `
        .iplm-popup-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
        }
        
        .iplm-popup-container {
            background-color: rgba(30, 30, 36, 0.9);
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            padding: 25px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            animation: iplm-fadeIn 0.3s ease-out;
        }
        
        @keyframes iplm-fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        
        .iplm-poster-wrapper {
            position: relative;
            width: 100%;
            margin-bottom: 25px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
        }
        
        .iplm-poster-wrapper:hover {
            transform: scale(1.02);
        }
        
        .iplm-poster-img {
            width: 100%;
            height: auto;
            display: block;
            opacity: 0.9;
            transition: opacity 0.3s ease;
        }
        
        .iplm-poster-img:hover {
            opacity: 1;
        }
        
        .iplm-close-button {
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            color: white;
            border: none;
            padding: 12px 25px;
            font-size: 15px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            max-width: 150px;
            margin: 10px auto 0;
            display: block;
            font-weight: 500;
            letter-spacing: 0.5px;
            text-shadow: 0 1px 1px rgba(0,0,0,0.2);
        }
        
        .iplm-close-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            background: linear-gradient(135deg, #7b9aff, #b886f0);
        }
        
        @media (max-width: 480px) {
            .iplm-popup-container {
                width: 95%;
                padding: 20px;
            }
            
            .iplm-close-button {
                padding: 10px 20px;
                font-size: 14px;
            }
        }
    `;
    
    // Create popup HTML structure
    const popupHTML = `
        <div class="iplm-popup-overlay" id="iplm-popup-main">
            <div class="iplm-popup-container">
                <a id="iplm-poster-link" target="_blank" class="iplm-poster-wrapper">
                    <img id="iplm-poster-image" src="" alt="Match Poster" class="iplm-poster-img">
                </a>
                <button class="iplm-close-button">Close</button>
            </div>
        </div>
    `;
    
    // Create container div and inject HTML
    const container = document.createElement('div');
    container.innerHTML = popupHTML;
    
    // Add elements to document
    document.head.appendChild(style);
    document.body.appendChild(container);
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const matchId = urlParams.get('id');
    
    if (matchId) {
        // Fetch match data
        fetch('https://binge-api.vercel.app/ipl.json')
            .then(response => response.json())
            .then(data => {
                const matchData = data.matches.find(m => m.id === matchId);
                
                if (matchData && matchData.status === 'full') {
                    const popup = document.getElementById('iplm-popup-main');
                    const posterLink = document.getElementById('iplm-poster-link');
                    const posterImage = document.getElementById('iplm-poster-image');
                    const closeBtn = document.querySelector('.iplm-close-button');
                    
                    // Set popup content
                    posterLink.href = matchData.url;
                    posterImage.src = matchData.poster;
                    popup.style.display = 'flex';
                    
                    // Close popup function
                    function closePopup() {
                        popup.style.animation = 'iplm-fadeIn 0.3s ease-out reverse';
                        setTimeout(() => {
                            popup.style.display = 'none';
                        }, 250);
                    }
                    
                    // Set up event listeners
                    closeBtn.addEventListener('click', closePopup);
                    
                    // Auto-close after 1 second
                    setTimeout(closePopup, 1000);
                    
                    // Close when clicking outside
                    popup.addEventListener('click', (e) => {
                        if (e.target === popup) {
                            closePopup();
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error loading IPL match data:', error);
            });
    }
}

// Execute when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIPLPopup);
} else {
    initIPLPopup();
}
