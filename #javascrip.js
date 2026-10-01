const card = document.getElementById("card");
    function showSignup() {
      card.classList.add("signup-mode");
      clearMessages();
    }

    function showLogin() {
      card.classList.remove("signup-mode");
      clearMessages();
    }

    function togglePassword(id, element) {
      const input = document.getElementById(id);
      if (input.type === "password") {
        input.type = "text";
        element.textContent = "🙈";
      }
      else {
        input.type = "password";
        element.textContent = "👁";
      }
    }

    function showMessage( element, text, type) {
      element.textContent = text;
      element.className = "message show " + type;
    }

    function clearMessages() {
      document.querySelectorAll(".message").forEach(message => {
          message.textContent = "";
          message.className = "message";
        });
    }

    document.getElementById("loginForm").addEventListener("submit",function (e) {
          e.preventDefault();
          const email = document.getElementById("loginEmail").value;
          const password =
            document.getElementById("loginPassword").value;
            const message = document.getElementById("loginMessage");
            const button =document.getElementById("loginBtn");
            button.classList.add("loading");
            setTimeout(() => {
            button.classList.remove("loading");
            /*
                DEMO LOGIN

                Email:
                admin@example.com

                Password:
                123456
            */

            if (email === "admin@example.com" && password === "123456") 
              { 
                  showMessage(message, "✓ LOGIN SUCCESSFUL!", "success"); 
              } else { 
                  showMessage(message, "✕ INVALID EMAIL OR PASSWORD!", "failed"); 
              } 
          }, 900); 
          } 
          );  
          document.getElementById("signupForm").addEventListener("submit", function (e) { e.preventDefault(); 
              const name = document.getElementById("signupName").value.trim(); 
              const email = document.getElementById("signupEmail").value.trim(); 
              const password = document.getElementById("signupPassword").value; 
              const message = document.getElementById("signupMessage"); 
              const button = document.getElementById("signupBtn"); 
              button.classList.add("loading"); 
              setTimeout(() => { button.classList.remove("loading"); 
                  if (name.length >= 3 && email.includes("@") && email.includes(".") && password.length >= 6) 
                      { showMessage(message, "✓ ACCOUNT CREATED SUCCESSFULLY!", "success"); 

                      } else { 
                          showMessage(message, "✕ PLEASE ENTER VALID INFORMATION!", "failed"); 
                      } 
                  }, 900); 
              });
      