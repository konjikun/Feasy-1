/*;<script
  src="https://code.jquery.com/jquery-3.6.1.js"
  integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI="
  crossOrigin="anonymous"
/>
*/

const feasy = {
  buttonAppend: (buttonPosition) => {
    $(buttonPosition).append(
      '<input style="width: 10em; height:3em;" type="button" value="feasyから入力" width=500 height=100 id="modalBtn">'
    )
    $('#modalBtn').click(function () {
      $('#contents').append(
        '<section style="display: none; position: fixed; top:0;left:0;width:100%;height:100%;"id="modalArea" class="modalArea">\
        <iframe style="position: absolute; top: 50%; left: 50%; transform:translate(-50%,-50%); border:none; width:100%; height:100vh;" height="360" id="childIframe" src="https://yoshi-program.github.io/Feasy"></iframe>\
        </section>'
      )
    })
  },
  modalPrep: () => {
    window.addEventListener('message', (event) => {
      console.log('message')
    })
  },
}

window.feasy = feasy
