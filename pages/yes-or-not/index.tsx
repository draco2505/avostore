import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout/Layout'

const Question = () => {
  const [answer, setAnswer] = useState<boolean>(false);
  const options : boolean[] = [true, false];
  const ChangeAnswer = () =>{
    const sample = options[Math.floor(Math.random() * options.length)];
     setAnswer(sample)     
  }

  useEffect(() => {
    ChangeAnswer()
  }, [])
  return (
    <Layout>
      <div>
        <div className="answer">
          <p>{answer ? 'YES' : 'NO' }</p>
        </div>
        <div className="actions">
            <input type='button' value='Intentar de nuevo' onClick={ChangeAnswer} />
            <input type="button" value='Volver al inicio' />
        </div>
      </div>
    </Layout>
  )
}

export default Question
