function handleLogin() {
            const userInp = document.getElementById('username');
            const passInp = document.getElementById('password');
            const formContent = document.getElementById('formContent');
            const successMsg = document.getElementById('successMsg');
            
            // Mock credentials for testing
            const correctUser = "admin";
            const correctPass = "1234";

            // Remove previous animation classes if they exist
            userInp.classList.remove('error', 'success');
            passInp.classList.remove('error', 'success');

            // Trigger reflow so animations can restart if clicked multiple times
            void userInp.offsetWidth;
            void passInp.offsetWidth;

            if (userInp.value === correctUser && passInp.value === correctPass) {
                // --- SUCCESS STATE ---
                // Add rotate-out success animation to inputs
                userInp.classList.add('success');
                passInp.classList.add('success');

                // Wait for input rotation to finish (600ms), then fade out form & pop in success message
                setTimeout(() => {
                    formContent.classList.add('hide');
                    successMsg.classList.add('show');
                }, 600);

                // Optional: Reset form automatically after 4 seconds to test again
                setTimeout(() => {
                    successMsg.classList.remove('show');
                    
                    setTimeout(() => {
                        formContent.classList.remove('hide');
                        userInp.value = '';
                        passInp.value = '';
                        userInp.classList.remove('success');
                        passInp.classList.remove('success');
                    }, 400);
                }, 4000);

            } else {
                // --- ERROR STATE ---
                // Add rotation wobble and red colors
                userInp.classList.add('error');
                passInp.classList.add('error');

                // Automatically remove the error class after the animation ends (500ms) 
                // so it returns back to the original design
                setTimeout(() => {
                    userInp.classList.remove('error');
                    passInp.classList.remove('error');
                }, 500);
            }
        }
      
