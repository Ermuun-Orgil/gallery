import React, { createContext, useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import {
  REQUEST_ADMISSION_DATA,
  REQUEST_EXAM_SCREEN,
} from '../graphql/queries';
import _ from 'lodash';
import { NavigationRoutes } from '../navigation/navigation-params';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from './auth';
import { useCollection, useDocument } from '../hooks';

type QuizType = {
  id: string;
  question: string;
  questionPicture: string;
  answerPicture: string;
  correctAnswers: string;
  point: number;
  answers: any;
  type: string;
  score: number;
  userAnswer: null | string;
};

export const ExamContext = createContext<any>({
  quizes: [],
  popUp: false,
  setPopUp: () => {},
  setQuizes: () => {},
  updateAnswer: () => {},
  finishExam: () => {},
  endExam: () => {},
});

export const ExamProvider = ({ children }: any) => {
  const { data, loading } = useQuery(REQUEST_EXAM_SCREEN);
  const [popUp, setPopUp] = useState(false);
  const [quizes, setQuizes] = useState<Array<QuizType>>([]);
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const admissionData = useQuery(REQUEST_ADMISSION_DATA);
  const { collection }: any = useCollection(`users/${user?.uid}/admissions`);
  const admissionProcessData: any = _.intersectionBy(
    collection,
    admissionData.data?.mainCourseCollection.items,
    'admissionId'
  )[0];
  const { updateRecord } = useDocument(
    `users/${user?.uid}/admissions/${admissionProcessData?.admissionId}`
  );

  useEffect(() => {
    if (!loading && data) {
      const iqQuizes = data?.exam?.iqCollection.items;
      const designQuizes = data?.exam?.designCollection.items;
      const logicQuizes = data?.exam?.logicCollection.items;
      const mathQuizes = data?.exam?.mathCollection.items;

      const quizItems: any = _.concat(
        _.sampleSize(logicQuizes, 6),
        _.sampleSize(mathQuizes, 13),
        _.sampleSize(designQuizes, 8),
        _.sampleSize(iqQuizes, 3)
      );

      setQuizes(
        _.map(quizItems, (e) => {
          let string = _.map(
            e.question.json.content,
            (line) => line.content[0].value
          ).join('\n');
          return {
            id: e?.sys?.id,
            question: string,
            questionPicture: e?.questionPicture?.url,
            answerPicture: e?.answerPicture?.url,
            correctAnswers: e.answer.correctAnswer,
            point: e.point,
            answers: _.sampleSize(
              e?.answer?.answers,
              e?.answer?.answers?.length + 2
            ),
            type: e.type,
            score: 0,
            userAnswer: null,
          };
        })
      );
    }
  }, [data]);

  const updateAnswer = (id: string, answer: string) => {
    setQuizes((quizes) =>
      _.map(quizes, (quiz) => {
        return quiz.id == id
          ? {
              ...quiz,
              score: _.isArray(quiz.correctAnswers)
                ? _.includes(quiz.correctAnswers, answer)
                  ? quiz.point
                  : 0
                : quiz.correctAnswers == answer
                ? quiz.point
                : 0,
              userAnswer: answer,
            }
          : quiz;
      })
    );
  };

  const finishExam = async () => {
    const examScore = _.reduce(quizes, (total, quiz) => total + quiz.score, 0);

    await updateRecord({
      examresult: quizes,
      examscore: examScore,
      admissionStep: examScore > 18 ? 3 : 2,
      admissionStatus: examScore > 18 ? 'default' : 'error',
    });

    await navigation.navigate(NavigationRoutes.ExamResultScreen, {
      score: examScore,
      totalScore: 30,
    });
  };

  const endExam = async () => {
    const examScore = _.reduce(quizes, (total, quiz) => total + quiz.score, 0);

    await updateRecord({
      examresult: quizes,
      examscore: examScore,
      admissionStep: examScore > 18 ? 3 : 2,
      admissionStatus: examScore > 18 ? 'default' : 'error',
    });

    await navigation.navigate(NavigationRoutes.ExamResultScreen, {
      score: examScore,
      totalScore: 30,
    });
  };

  return (
    <ExamContext.Provider
      value={{
        popUp,
        quizes,
        setPopUp,
        endExam,
        setQuizes,
        updateAnswer,
        finishExam,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};
