import { useState , useEffect } from 'react';
import { Container , Row , Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import headerImg from '../assets/img/solaire.svg';


export default function Banner () {
    const [loopNum , setLoopNum] = useState(0);
    const [isDeleting , setIsDeleting] = useState(false);
    const toRotate = ["Web Dev", "Front-End Dev", "Back-End Dev"];
    const [text , setText] = useState('');
    const [delta , setDelta] = useState(300 - Math.random() * 100);
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)

        return () => { clearInterval(ticker)};
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updateText = isDeleting ? fullText.substring(0, text.length -1) : fullText.substring(0, text.length + 1);

        setText(updateText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta /2)
        }

        if (!isDeleting && updateText === fullText){
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updateText === ''){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

    return (
        <section className='banner' id='home'>
            <Container fluid>
                <Row>
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline text-white">Welcome to my Portfolio</span>
                        <h1>{`Hi, I'm Carmelo La Mantia a `}<span className='wrap'>{text}</span></h1>
                        <p className='bg-white text-black rounded opacity-50 p-2'>Sono un Junior full stack developer con sede ad Agrigento, in Sicilia. Ho frequentato il corso di Tecnico gestione siti web presso Empatia e ho successivamente proseguito la mia formazione come Full Stack Developer presso Aulab srl a Bari. Durante il bootcamp, ho acquisito competenze tecniche su entrambi i lati del front-end e back-end utilizzando linguaggi come HTML, CSS, JavaScript, PHP e framework come Laravel e Bootstrap. Ho anche sviluppato abilità pratiche utilizzando strumenti come Git, GitHub, Visual Studio Code e WordPress.</p>
                        <button onClick={() => console.log('connect')}>Per maggiori informazioni <ArrowRightCircle size={25}/></button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt='header img' />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}