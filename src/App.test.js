import React from 'react';
import ReactDOM from 'react-dom';
import {
  render,
  fireEvent,
  getByLabelText,
  getByText,
  queryByText,
  getByTestId,
  getNodeText,
} from '@testing-library/react';
import App from './App';

const gameSentence = 'gamesentence';

describe('App', () => {
  const { container } = render(<App />);

  it('renders correctly', () => {
    expect(container).toMatchSnapshot();
  });

  describe('tests with input in StartScene', () => {
    const inputNode = getByLabelText(container, 'Insert the word', {
      selector: 'input',
    });

    const doneButton = getByText(container, 'Done');

    const errorString = 'The word should be 5 and 15 characters long';

    it('correctly handles no value', () => {
      const value = inputNode.value;

      fireEvent.change(inputNode, {
        target: { value: '' },
      });

      expect(inputNode.value).toEqual(value);
    });

    it('cannot be sumitted when entering less than 5 characters', () => {
      fireEvent.change(inputNode, {
        target: { value: 'word' },
      });

      fireEvent.keyPress(inputNode, { key: 'Enter', code: 13, charCode: 13 });

      const errorSpan = getByText(container, errorString);

      expect(errorSpan).toBeTruthy();
      expect(queryByText(container, 'Done')).toBeTruthy();
    });

    it('shows errors if trying to enter more than 15 characters', () => {
      fireEvent.change(inputNode, {
        target: { value: 'thisisaveryverylongsentence' },
      });

      const errorSpan = getByText(container, errorString);

      expect(errorSpan).toBeTruthy();
    });

    it('does not show errors if entering between 0 and 15 characters', () => {
      fireEvent.change(inputNode, {
        target: { value: gameSentence },
      });

      const errorSpan = queryByText(container, errorString);

      fireEvent.click(doneButton);

      expect(errorSpan).toBeNull();
      expect(queryByText(container, 'Done')).toBeNull();
    });
  });

  describe('when in game scene', () => {
    const mainDiv = getByTestId(container, 'app-root');

    it('renders correctly after submitting a word', () => {
      expect(container).toMatchSnapshot();
    });

    it('reacts correctly when entering characters', () => {
      fireEvent.keyDown(mainDiv, { key: 'a' });
      fireEvent.keyDown(mainDiv, { key: 'm' });

      expect(container).toMatchSnapshot();
    });

    it('handles winning correctly', () => {
      fireEvent.keyDown(mainDiv, { key: 'e' });
      fireEvent.keyDown(mainDiv, { key: 's' });
      fireEvent.keyDown(mainDiv, { key: 'n' });
      fireEvent.keyDown(mainDiv, { key: 't' });
      fireEvent.keyDown(mainDiv, { key: 'c' });

      const winSpan = getByText(container, 'You Win!');
      const againButton = getByText(container, 'Try Again');

      expect(winSpan).toBeTruthy();
      expect(againButton).toBeTruthy();
    });

    it('resets the game correctly', () => {
      const againButton = getByText(container, 'Try Again');
      fireEvent.click(againButton);

      expect(container).toMatchSnapshot();
    });

    it('correctly subtracts lives when entering the wrong letter', () => {
      const inputNode = getByLabelText(container, 'Insert the word', {
        selector: 'input',
      });
      const doneButton = getByText(container, 'Done');

      fireEvent.change(inputNode, {
        target: { value: gameSentence },
      });

      fireEvent.click(doneButton);

      const remainingLivesText = num => 'Remaining lives: ' + num;

      const livesSpan = getByText(container, remainingLivesText(7));

      fireEvent.keyDown(mainDiv, { key: 'x' });

      expect(getNodeText(livesSpan)).toEqual(remainingLivesText(6));
    });

    it('correctly shows the game over screen when entering the wrong letter too many times', () => {
      for (let i = 0; i < 7; i++) {
        fireEvent.keyDown(mainDiv, { key: 'x' });
      }

      const gameOverSpan = getByText(container, 'Game Over...');
      const againButton = getByText(container, 'Try Again');

      expect(gameOverSpan).toBeTruthy();
      expect(againButton).toBeTruthy();
    });

    it('resets the game correctly', () => {
      const againButton = getByText(container, 'Try Again');
      fireEvent.click(againButton);

      expect(container).toMatchSnapshot();
    });
  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
