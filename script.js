// Tenta impedir o comportamento padrão do navegador com F11
document.addEventListener('keydown', function(event) {
    if (event.key === "F11") {
        event.preventDefault();  
        alert("Por favor, use o botão na tela para entrar ou sair do modo de tela cheia.");
    }
})

// Função para alternar o estado de tela cheia
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById("fullscreenIcon").src = "./img/exit_fullscreen.png";
        document.getElementById("fullscreenIcon").alt = "Com fullscreen";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            document.getElementById("fullscreenIcon").src = "./img/enter_fullscreen.png";
            document.getElementById("fullscreenIcon").alt = "Sem fullscreen";
        }
    }
}

// Monitora mudanças no estado de tela cheia e ajusta o ícone apropriadamente
document.addEventListener("fullscreenchange", function () {
    var icon = document.getElementById("fullscreenIcon");
    if (document.fullscreenElement) {
        icon.src = "./img/exit_fullscreen.png";
        icon.alt = "Com fullscreen";
    } else {
        icon.src = "./img/enter_fullscreen.png";
        icon.alt = "Sem fullscreen";
    }
});

/*
Throttling
Throttling é uma técnica que garante que uma função específica seja executada no máximo uma vez a cada determinado período de tempo, não importa quantas vezes o evento é disparado. Diferente do debouncing, o throttling não espera que os eventos parem para executar a função; ele simplesmente limita a frequência com que a função pode ser executada.
*/
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

const throttledAdjust = throttle(function() {
    adjustAspectRatio();
}, 100);

function adjustAspectRatio() {
    const targetAspectRatio = 16 / 9;
    let windowAspectRatio = window.innerWidth / window.innerHeight;
    let width, height;

    if (windowAspectRatio > targetAspectRatio) {
        height = window.innerHeight;
        width = height * targetAspectRatio;
    } else {
        width = window.innerWidth;
        height = width / targetAspectRatio;
    }

    const box = document.getElementById('aspectRatioBox');
    if (box) {
        box.style.width = `${width}px`;
        box.style.height = `${height}px`;
    }
}

// Função para detectar se o dispositivo atual é um dispositivo móvel
function isMobileDevice() {
    // Utiliza uma expressão regular para procurar por palavras-chave que são comumente encontradas
    // nos identificadores de agente de usuário (userAgent) de dispositivos móveis, como smartphones e tablets.
    // Esta verificação inclui várias plataformas como Android, iOS, Windows Phone, etc.
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para verificar e atualizar a orientação da tela
function checkOrientation() {
    const orientationElement = document.getElementById('orientation');
    if (window.innerWidth > window.innerHeight) {
        // Atualiza o texto do elemento com ID 'orientation' para "Paisagem"
        orientationElement.innerText = "Paisagem";
    } else {
        // Atualiza o texto do elemento com ID 'orientation' para "Retrato"
        orientationElement.innerText = "Retrato";
    }
}

// Verifica se o dispositivo é móvel usando a função isMobileDevice
if (isMobileDevice()) {
    // Adiciona um ouvinte de eventos ao objeto window para detectar mudanças de tamanho da janela
    // Este evento é acionado quando a janela é redimensionada
    window.addEventListener('resize', checkOrientation);

    // Chama a função checkOrientation inicialmente ao carregar a página
    // para verificar e logar a orientação atual imediatamente
    checkOrientation();
} else {
    // Se o dispositivo não é móvel, atualiza o elemento para indicar que não está monitorando a orientação
    const orientationElement = document.getElementById('orientation');
    orientationElement.innerText = "Dispositivo não móvel, orientação não monitorada.";
}

// Adiciona eventos de ajuste ao redimensionar e ao carregar
window.addEventListener('resize', throttledAdjust);
window.addEventListener('load', adjustAspectRatio);

// Adiciona evento para detectar mudanças na orientação/redimensionamento
window.addEventListener('resize', checkOrientation);

