// Function to get cookie by name
function getCookie(name) {
    let cookieValue = "";
    const allCookies = document.cookie.split(';');
    for(let i = 0; i < allCookies.length; i++) {
        let cookie = allCookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name + "=") === 0) {
            cookieValue = cookie.substring(name.length + 1, cookie.length);
            break;
        }
    }
    return cookieValue;
}

// Function to parse JSON from the cookie and extract the access token
function extractTokenFromCookie(cookieName) {
    const jsonCookie = getCookie(cookieName);
    try {
        const jsonData = JSON.parse(decodeURIComponent(jsonCookie));
        return jsonData.access_token;
    } catch(e) {
        console.error("Error parsing JSON from cookie or extracting the token:", e);
        return null;
    }
}

const accessToken = extractTokenFromCookie('_oauth2_access_v2');
console.log(accessToken);



fetch('https://my.wealthsimple.com/api/users', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'X-Ws-Locale': 'en-CA',
        'X-Ws-Profile': 'tax',
        'X-Platform-Os': 'web',
        'Authorization': 'Bearer ' + accessToken,
        'Sec-Ch-Ua-Mobile': '?0',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36',
        'Sec-Ch-Ua': '"Chromium";v="103", ".Not/A)Brand";v="99"',
        'Sec-Ch-Ua-Platform': '"Linux"',
        'Origin': 'https://investor-news-archive.wealthsimple.com/',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://my.wealthsimple.com/app/settings/profile',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9'
    },
    body: JSON.stringify({
        email: "bluespacezebra41@proton.me"
    }),
    credentials: 'include' // include credentials in the request
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json(); // Parses the body of the response as JSON
})
.then(data => {
    console.log('Data received:', data); // Data is the parsed JSON object
})
.catch(error => {
    console.error('Fetch error:', error); // Handle any errors
});
