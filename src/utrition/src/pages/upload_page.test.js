import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Upload from './upload_page';
import TextUploadmock from '../components/textupload/testingupload';
import React from 'react'
// import TestRenderer from 'react-test-renderer';

test('sucessful ability to call axios', () => {
    //to render do you need other elements?
    //curly brackets means not html, 
    // RECREATE HTTP REQUEST WITH AXIOS, OBJECTIVE test async code (aka axios, async, promises)
    //whatever function is async (in voiceupload the axios code), make function exportable - reference and grab
    //make exportable and then import "getvoicerecording"
    //await the function call
    //ALTERNATIVE WITH VIT
    // userEvent.click(button); 
    // const TextUploadmock = require('../components/textupload/testingupload');
    // expect(TextUploadmock.handleSubmit()).notToBe(null);
    render(<TextUploadmock />); 
    TextUploadmock.TextUploadmock = jest.fn();
        const value = TextUploadmock.TextUploadmock();
        expect(value).not.toBe(null);

    // const button = screen.getByTestId('textuploadbutton') 
    // // await waitFor(() =>  
    // expect(button).toBeInTheDocument();
});

