import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Home from './index';
import Upload from './upload_page';

test('text upload button works', () => {
    render(<Upload />);
    const button = screen.getByTestId('textuploadbutton') 
    userEvent.click(button); 
    // await waitFor(() =>  
    expect(button).toBeInTheDocument();
});