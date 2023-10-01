/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ModalWindow from './ModalWindow.jsx';
import Questions_Answers from './Questions_Answers.jsx';
import Answer from './Answer.jsx';
import Answers from './Answers.jsx';
import Question from './Question.jsx';


describe('Questions_Answers component rendering', function() {
  test("should check whether an element rendered or not", function() {
    render(<Questions_Answers />);
    expect(screen.getByText('Add Question')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Add Question'})).toBeInTheDocument();
    expect(screen.queryByText('button', {name: 'hello'})).toBeNull();
  });
})

describe('Answer.jsx', function() {
  let mockData = {
    answer_id: 5988579,
    answerer_name: "Seller",
    body: "bUy My sTuFf",
    date: "2022-09-17T00:00:00.000Z",
    helpfulness: 4,
    photos: []
  };
  test("should return formatted date", function() {
    render(<Answer answer={mockData} />)
    // let answerInstance = new Answer();
    // let date = '2022-09-17T00:00:00.000Z';
    // expect(screen.).toEqual('September 17, 2022');
  });
  test("should handle the handleReport function correctly", async function() {
    render(<Answer answer={mockData} />);

    const element = screen.getByRole('button');
    fireEvent.click(element)

    expect(screen.getByText('Reported')).toBeInTheDocument();
  })
})

describe('Email validation', function() {
  test("should validate as a invalid email address", function() {
    let modalInstance = new ModalWindow();
    let invalidInput = 'jack';
    let invalidInput2 = 'jack@';
    let invalidInput3 = 'jack@.email.com';

    expect(modalInstance.validateEmail(invalidInput)).toBeNull();
    expect(modalInstance.validateEmail(invalidInput2)).toBeNull();
    expect(modalInstance.validateEmail(invalidInput3)).toBeNull();
  });
  test("should validate as a valid email address", function() {
    let modalInstance = new ModalWindow();
    let validInput = 'jack@gmail.com';
    let validInput2 = 'jack@email.com'
    let validInput3 = 'jac123k@email.com'

    expect(modalInstance.validateEmail(validInput)).toBeTruthy();
    expect(modalInstance.validateEmail(validInput2)).toBeTruthy();
    expect(modalInstance.validateEmail(validInput3)).toBeTruthy();
  })
})