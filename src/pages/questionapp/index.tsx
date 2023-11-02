import React, { useState, useEffect } from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
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

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(
          '/api/question?id=6542e281eee1ed9f187e1d5b',
        )
        const data = await response.json()
        console.log(data)

        if (response.ok) {
          setExam(data.data)

          if (data.data.timeUser) {
            const [minutes, seconds] = data.data.timeUser.split(':').map(Number)
            const timeElapsedInSeconds = minutes * 60 + seconds
            setTimeLeft(timeElapsedInSeconds)
          }
        } else {
          setError(data.message || 'Failed to fetch exam')
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchExam()
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
        '/api/question?id=6542e281eee1ed9f187e1d5b',
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
          <b>"Se acabo el time"</b>{' '}
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
