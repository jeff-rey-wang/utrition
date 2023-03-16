import TextUpload from './sound-player';
jest.mock('./sound-player'); // SoundPlayer is now a mock constructor

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  TextUpload.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
  expect(TextUpload.handleSubmit).toHaveBeenCalledTimes(1);
});