document.addEventListener('DOMContentLoaded', function () {
    const partTypes = ['color', 'head', 'hair', 'eye', 'hand', 'cloth', 'back'];

    partTypes.forEach(part => {
        const radioButtons = document.querySelectorAll(`input[type="radio"][name="${part}"]`);
        const canvasImg = document.getElementById(`canvas-${part}`);

        // 初期状態でチェックされているラジオボタンを探して表示
        const checkedRadioButton = document.querySelector(`input[type="radio"][name="${part}"]:checked`);
        if (checkedRadioButton) {
            const selectedImgSrc = checkedRadioButton.getAttribute('data-img');
            canvasImg.setAttribute('src', selectedImgSrc);
            console.log(`Initial ${part} Image Source:`, selectedImgSrc);
        }

        radioButtons.forEach(radio => {
            radio.addEventListener('change', function () {
                const selectedImgSrc = this.getAttribute('data-img');
                console.log(`Selected ${part} Image Source:`, selectedImgSrc);
                canvasImg.setAttribute('src', selectedImgSrc);
            });
        });
    });

    // キャンバスを画像として出力し、ダウンロードする機能
    document.getElementById('download-btn').addEventListener('click', function () {
        const canvasBox = document.getElementById('canvas-box');
        html2canvas(canvasBox).then(canvas => {
            const link = document.createElement('a');
            link.download = 'canvas-image.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // 横スクロールが縦にふわふわ動くのを防ぐ
    const contentsBox = document.querySelector('.contents-box');

    contentsBox.addEventListener('wheel', function (event) {
        if (event.deltaY !== 0) {
            event.preventDefault();
            contentsBox.scrollLeft += event.deltaY;
        }
    });
});
