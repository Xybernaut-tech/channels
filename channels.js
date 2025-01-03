        async function fetchChannelUrl() {
            const id = new URLSearchParams(window.location.search).get('id');
            if (!id) {
                console.error('No id parameter found in the URL.');
                return;
            }

            const currentDomain = window.location.origin;
            const now = new Date();

            let timeout = setTimeout(() => {
                document.getElementById('loadingMessage').style.display = 'none';
                document.getElementById('contentFrame').style.display = 'block';
                document.getElementById('contentFrame').src = 'https://bingewav-sports.netlify.app/recharge';
            }, 5000);

            try {
                const response = await fetch('https://contact-ayushxshivam-for-your-own-links.vercel.app/list.txt');
                const data = await response.text();
                const lines = data.split('\n');
                let validDomains = [];

                for (const line of lines) {
                    if (line.startsWith('#valid')) {
                        const domainMatch = line.match(/domain="(.*?)"/);
                        const dateMatch = line.match(/date="(.*?)"/);
                        const timeMatch = line.match(/time="(.*?)"/);
                        if (domainMatch && dateMatch && timeMatch) {
                            const domain = domainMatch[1];
                            const [day, month, year] = dateMatch[1].split('/').map(Number);
                            const [hours, minutes] = timeMatch[1].split(':').map(Number);
                            const expiry = new Date(year, month - 1, day, hours, minutes);
                            if (expiry > now) validDomains.push(domain);
                        }
                    }
                }

                for (const line of lines) {
                    if (line.startsWith('#ch') && line.includes(`id="${id}"`)) {
                        const urlMatch = line.match(/url="(.*?)"/);
                        const domainMatch = line.match(/domain="(.*?)"/);
                        if (urlMatch && domainMatch) {
                            const url = urlMatch[1];
                            const domains = domainMatch[1].split(',').map(d => d.trim());
                            if (domains.some(d => validDomains.includes(d) && d === currentDomain)) {
                                clearTimeout(timeout);
                                document.getElementById('loadingMessage').style.display = 'none';
                                document.getElementById('contentFrame').style.display = 'block';
                                document.getElementById('contentFrame').src = url;
                                return;
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching channel list:', error);
            }
        }

        window.onload = fetchChannelUrl;
  
