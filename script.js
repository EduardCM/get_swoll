let counter = 0;
let redeemClicks = 0;
let redeemClicksTarget = 6;
let canTap = true;
let counterTarget = 32;
let currentHourTarget = 20;
let open_link = "https://google.com";

document.getElementById('container').addEventListener('click', () => {
    if (canTap) {
        counter++;
        document.getElementById('counter').textContent = counter;

        // Arm curl animation
        // document.getElementById('forearm').classList.remove('armAnimation');
        document.querySelector('.forearm').classList.add('armAnimation');

        // Disable tapping for 2 seconds
        canTap = false;
        setTimeout(() => {
            canTap = true;
            document.querySelector('.forearm').classList.remove('armAnimation');
        }, 2000);

        // Check if the counter reaches 32 after incrementing
        if (counter === counterTarget && redeemClicks < redeemClicksTarget) {
            document.getElementById('overlay').classList.remove('hidden');
        } else if (counter > counterTarget && redeemClicks >= redeemClicksTarget) {
            // If somehow the counter goes beyond 32 and redeem clicks are completed, reset it to 32
            counter = counterTarget;
            document.getElementById('counter').textContent = counter;
        }
    }
});

document.querySelector('.redeemLink').addEventListener('click', () => {
    if (counter === counterTarget && redeemClicks < redeemClicksTarget) {
        // Change the position of the modal once when the redeem button is clicked
        changeModalPosition();
        redeemClicks++;

        if (redeemClicks === redeemClicksTarget) {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            if (currentHour >= currentHourTarget) {
                // If it's after 20:00 (8 PM), open the URL in a new window/tab
                var whatsThat = window.confirm("What's that? (tap OK)");
                if (whatsThat) { // if they clicked "ok"
                    window.open(open_link, "_blank");
                }
            } else {
                // If it's before 20:00, show an alert
                console.log(currentHour);
                alert('The time is not yet right!');
            }
        }
    }
});

function changeModalPosition() {
    const modal = document.querySelector('.modal');

    // Generate random position coordinates
    const posX = Math.floor(Math.random() * (window.innerWidth - 200)); // Subtract 200 to keep the modal fully visible
    const posY = Math.floor(Math.random() * (window.innerHeight - 200)); // Subtract 200 to keep the modal fully visible

    // Apply new position styles
    modal.style.left = `${posX}px`;
    modal.style.top = `${posY}px`;
}
