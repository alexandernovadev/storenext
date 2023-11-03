import React, { useState, useEffect } from 'react'


import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { verify } from 'crypto'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import { Button } from '@mui/material'
import { purple } from '@mui/material/colors'

interface Option {
  name: string
  id: string
}

interface Question {
  name: string
  desc: string
  options: Option[]
  correct: string
}

interface Exam {
  usuario: string
  fechaHoraInicio: string
  fechaHoraFin: string
  ipUsuario: string
  puntajeObtenido: number
  questions: Question[]
}

const QuestionAppPage = () => {
  const [exam, setExam] = useState<Exam>()
  const [loading, setLoading] = useState(true)
  const [isShowResult, setIsShowResult] = useState(false)
  const [timeEnds, setTimeEnds] = useState(false)
  const [results, setResults] = useState({
    result: 0,
    corrects: '3/3',
  })

  const [error, setError] = useState(null)
  const [timeLeft, setTimeLeft] = useState<number>(300)

  const sliderRef = React.useRef(null)

  const [userAnswers, setUserAnswers] = useState<{
    [questionName: string]: string
  }>({})

  const [ipUsuario, setIpUsuario] = useState<string | null>(null)

  useEffect(() => {
    // Función para prevenir la recarga de la página y el clic derecho
    const preventReloadAndRightClick = (e: KeyboardEvent | MouseEvent) => {
      if (
        e.type === "keydown" && 
        ((e as KeyboardEvent).which === 116 || 
        ((e as KeyboardEvent).which === 82 && (e as KeyboardEvent).ctrlKey))
      ) {
        e.preventDefault();
      } else if (e.type === "contextmenu") {
        e.preventDefault();
      }
    };

    // Event listeners para bloquear F5/Ctrl+R y el clic derecho
    document.addEventListener("keydown", preventReloadAndRightClick);
    document.addEventListener("contextmenu", preventReloadAndRightClick);

    // Limpiar los event listeners al desmontar el componente
    return () => {
      document.removeEventListener("keydown", preventReloadAndRightClick);
      document.removeEventListener("contextmenu", preventReloadAndRightClick);
    };
  }, []);
  useEffect(() => {
    // Función para manejar el evento beforeunload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Algunos navegadores requieren que se establezca returnValue.
      e.returnValue = '';
    };
  
    // Agregar y remover el event listener
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  // ... el resto de tu código ...
  
  
  
  useEffect(() => {
    if (timeLeft < 1) {
      verifyOptions()
      setTimeEnds(true)
    }
  }, [timeLeft])

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setIpUsuario(data.ip)
      } catch (err: any) {
        console.error('Error fetching IP:', err)
      }
    }

    fetchIp()
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      // Handle time up logic here (like disabling the submit button)
      return
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [timeLeft])
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // intercambio de elementos
    }
    return array;
  };
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch('/api/question?id=6542f0d5a9f897300506947d');
        const data = await response.json();
        console.log(data);
  
        if (response.ok) {
          // Antes de establecer el examen, mezcla las preguntas
          const shuffledQuestions = shuffleArray(data.data.questions);
          const shuffledExam = { ...data.data, questions: shuffledQuestions };
          setExam(shuffledExam);
  
          if (data.data.timeUser) {
            const [minutes, seconds] = data.data.timeUser.split(':').map(Number);
            const timeElapsedInSeconds = minutes * 60 + seconds;
            setTimeLeft(timeElapsedInSeconds);
          }
        } else {
          setError(data.message || 'Failed to fetch exam');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchExam();
  }, [])

  const handleAnswerChange = (questionName: string, answerId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionName]: answerId,
    }))
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  const verifyOptions = async () => {
    if (!exam?.questions) {
      console.error('No exam questions found')
      return
    }

    let correctAnswersCount = 0

    exam.questions.forEach((q) => {
      const userAnswer = userAnswers[q.name]
      if (userAnswer === q.correct) {
        correctAnswersCount++
      }
    })

    const totalQuestions = exam.questions.length
    const scorePercentage = (correctAnswersCount / totalQuestions) * 100

    setResults({
      ...results,
      result: +scorePercentage.toFixed(0),
      corrects: `${correctAnswersCount}/${totalQuestions}`,
    })

    const updatedData = {
      timeUser: formatTime(timeLeft),
      puntajeObtenido: scorePercentage,
      ipUsuario,
    }

    try {
      const response = await fetch(
        '/api/question?id=6542f0d5a9f897300506947d',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        },
      )

      // console.log(response)
      setIsShowResult(true)
      if (response.ok) {
        const data = await response.json()
        console.log('Data updated successfully', data)
      }
    } catch (err: any) {
      console.error('Error updating exam data:', err)
    }
  }

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      {timeEnds && (
        <h1
          style={{
            color: '#d8432c',
          }}
        >
          <b>"Se acabo su tiempo"</b>{' '}
        </h1>
      )}
      <h1>Exam Questions</h1>
      <h2>{formatTime(timeLeft)} / 5:00</h2>

      {isShowResult && (
        <div
          style={{
            border: '3px dotted green',
            borderRadius: 23,
            padding: 12,
          }}
        >
          <h3>Tu resultado es</h3> <b>{results.result}/100</b> <hr />
          <h5> {results.corrects}</h5>
        </div>
      )}

      {/** @ts-ignore */}
      <Slider ref={sliderRef} {...settings}>
        {exam?.questions.map((q) => (
          <div key={q.name} style={{ width: 430 }}>
            <h2>{q.name}</h2>
            <p>{q.desc}</p>
            {q.options.map((option, i) => (
              <div className="radioWrapper" key={option.id}>
                <input
                  className="radioInput"
                  type="radio"
                  id={`${q.name}-${option.id}`}
                  value={option.id}
                  name={q.name}
                  onChange={() => handleAnswerChange(q.name, option.id)}
                  checked={userAnswers[q.name] === option.id}
                  disabled={isShowResult}
                />
                <label
                  className="radioLabel"
                  htmlFor={`${q.name}-${option.id}`}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{option.name}</span>
                    {isShowResult && (
                      <span>
                        {option.id !== q.correct ? (
                          <CloseIcon sx={{ color: 'red' }} />
                        ) : (
                          <CheckIcon sx={{ color: 'green' }} />
                        )}
                      </span>
                    )}
                  </div>
                </label>
              </div>
            ))}
            <Button
              style={{
                background: 'purple',
                color: 'white',
              }}
              // @ts-ignore
              onClick={() => sliderRef.current?.slickNext()}
            >
              Siguiente
            </Button>
          </div>
        ))}
      </Slider>

      <br />
      <div>
      {!timeEnds && (
        <Button
          onClick={verifyOptions}
          variant="outlined"
          style={{
            background: 'blue',
          }}
          disabled={timeLeft < 0 || isShowResult}
        >
          Enviar Test
        </Button>
        )}
      </div>
    </div>
  )
}


export default QuestionAppPage
