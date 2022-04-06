let turno;
let modoNormal = true;
const CARACTER_TURNO_1 = "X";
const CARACTER_TURNO_2 = "O";
const MINIMO_PARTIDAS_MODO_CHEAT_ON = 3;
let partidasGanadasX = 0;
let partidasGanadasO = 0;


function InicializarJuego()
{
    turno = CARACTER_TURNO_1;
    modoNormal = true;
    LimpiarTodo();
    BloquearTodo(false);
    ActualizarPuntajes();
    confetti.stop();
}

function ActualizarPuntajes()
{
    document.getElementById('lblPartidasGanadasX').innerHTML = partidasGanadasX;
    document.getElementById('lblPartidasGanadasO').innerHTML = partidasGanadasO;
}


function AnalizarSiGanoQuienToco()
{
    const A1 = document.getElementById('btnA1');
    const A2 = document.getElementById('btnA2');
    const A3 = document.getElementById('btnA3');

    const B1 = document.getElementById('btnB1');
    const B2 = document.getElementById('btnB2');
    const B3 = document.getElementById('btnB3');

    const C1 = document.getElementById('btnC1');
    const C2 = document.getElementById('btnC2');
    const C3 = document.getElementById('btnC3');

    if( AnalizarLinea(A1, B1, C1) || AnalizarLinea(A2, B2, C2) || AnalizarLinea(A3, B3, C3) ||    //Horizontal
        AnalizarLinea(A1, A2, A3) || AnalizarLinea(B1, B2, B3) || AnalizarLinea(C1, C2, C3) ||    //Vertical
        AnalizarLinea(A1, B2, C3) || AnalizarLinea(A3, B2, C1))                                   //Diagonales
    {
        FinalizarJuego();
        return true;
    }

    return false;
}

function AnalizarLinea(pos1, pos2, pos3)
{
    if(pos1.innerHTML === '-' || pos2.innerHTML === '-' || pos3.innerHTML === '-')
        return false;

    if(pos1.innerHTML === pos2.innerHTML && pos2.innerHTML === pos3.innerHTML)
    {
        PintarColor(pos1, "red");
        PintarColor(pos2, "red");
        PintarColor(pos3, "red");
        return true;
    }
}

function PintarColor(pieza, color)
{
    pieza.style.color = color;
}

function FinalizarJuego()
{
    BloquearTodo(true);
    confetti.start();
    Hey();
    alert("Gano: " + turno);
}

function BloquearTodo(bool)
{
    const piezas = [...document.getElementsByClassName("pieza")];
    piezas.forEach(pieza => pieza.disabled = bool);
}

function LimpiarTodo()
{
    const piezas = [...document.getElementsByClassName("pieza")];
    piezas.forEach(pieza => {
        pieza.innerHTML = "-"
        PintarColor(pieza, "black");
    });
}

function CambiarAXO(boton)
{
    if(boton.innerHTML !== "-" && modoNormal)
        return;

    boton.innerHTML = turno;

    if( AnalizarSiGanoQuienToco() )
    {
        SumarPuntaje(turno);
        HabilitarCheats();
        return;
    }

    turno = turno === CARACTER_TURNO_1 ? CARACTER_TURNO_2 : CARACTER_TURNO_1;
    ActualizarTurno();
}

function SumarPuntaje(turno)
{
    turno === CARACTER_TURNO_1 ? partidasGanadasX++ : partidasGanadasO++;
    ActualizarPuntajes();
}

function HabilitarCheats()
{
    const btnCheats = document.getElementById('btnCheats');

    if((partidasGanadasO === MINIMO_PARTIDAS_MODO_CHEAT_ON || partidasGanadasX === MINIMO_PARTIDAS_MODO_CHEAT_ON) && btnCheats.disabled)
    {
        alert(`Se habilitó el modo trampa porque alguien perdió ${MINIMO_PARTIDAS_MODO_CHEAT_ON} veces. ¡Suerte!`)
        btnCheats.disabled = false;
    }
}

function ActivarCheats()
{
    if(confirm("¿Esta seguro que desea activarlo? ( Hacer trampa está mal :D )"))
        modoNormal = false;
}

function Hey()
{
    document.getElementById('audioHey').play();
}

function ResetearPuntaje()
{
    partidasGanadasX = 0;
    partidasGanadasO = 0;
    ActualizarPuntajes();
    document.getElementById('btnCheats').disabled = true;
}