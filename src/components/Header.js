import React from "react";
import Swal from "sweetalert2";

const Header = () => {
  const HandleButton = () => {
    Swal.fire({
      title: '<h2 style="font-family: \'Luckiest Guy\', cursive; color: #fbbf24; text-shadow: 2px 2px #000;">🌴 Jungle Survival Guide 🌴</h2>',
      html: `
        <div style="text-align: left; font-family: 'Outfit', sans-serif;">
          <p style="margin-bottom: 20px; font-size: 1.1rem; text-align: center; color: #d1fae5;">Survive the snake by guessing the hidden word!</p>
          
          <ul style="list-style: none; padding: 25px; background: #064e3b; border-radius: 15px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);">
            
            <li style="margin-bottom: 15px; display: flex; align-items: flex-start;">
              <span style="font-size: 2rem; margin-right: 15px; line-height: 1;">🐍</span> 
              <div>
                <strong style="display: block; font-size: 1.2rem; color: #fff; margin-bottom: 2px;">Beware the Snake:</strong>
                <span style="color: #d1fae5; font-size: 1rem;">Every wrong guess brings the venomous viper closer!</span>
              </div>
            </li>

            <li style="margin-bottom: 15px; display: flex; align-items: flex-start;">
              <span style="font-size: 2rem; margin-right: 15px; line-height: 1;">🔤</span> 
              <div>
                <strong style="display: block; font-size: 1.2rem; color: #fff; margin-bottom: 2px;">Guess Wisely:</strong>
                <span style="color: #d1fae5; font-size: 1rem;">Press keys (A-Z) to reveal letters.</span>
              </div>
            </li>

            <li style="margin-bottom: 15px; display: flex; align-items: flex-start;">
              <span style="font-size: 2rem; margin-right: 15px; line-height: 1;">💀</span> 
              <div>
                <strong style="display: block; font-size: 1.2rem; color: #fff; margin-bottom: 2px;">6 Mistakes:</strong>
                <span style="color: #d1fae5; font-size: 1rem;">Make 6 errors and you become snake food!</span>
              </div>
            </li>

            <li style="margin-bottom: 0; display: flex; align-items: flex-start;">
              <span style="font-size: 2rem; margin-right: 15px; line-height: 1;">🏆</span> 
              <div>
                <strong style="display: block; font-size: 1.2rem; color: #fff; margin-bottom: 2px;">Win:</strong>
                <span style="color: #d1fae5; font-size: 1rem;">Complete the word to escape safely.</span>
              </div>
            </li>

          </ul>
        </div>
      `,
      background: 'linear-gradient(145deg, #064e3b, #065f46)',
      color: '#fff',
      confirmButtonText: 'I AM READY!',
      confirmButtonColor: '#fbbf24',
      buttonsStyling: true,
      customClass: {
        confirmButton: 'confirm-btn-class'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      width: 500,
      padding: '2em',
      backdrop: `
        rgba(0,0,0,0.8)
      `
    });
  };

  return (
    <>
      <h1>Jungle Hangman</h1>
      <p>Find the hidden word!</p>
      <button onClick={HandleButton}>Rules</button>
    </>
  );
};

export default Header;
