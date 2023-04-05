import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import { UserForm } from "../component/UserForm";

test('it shows two inputs and a button', () => {
    // render component
    render(<UserForm />);

    // Manipulate the component or find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    // Assertion (make sure the component is doing what we expect to do)
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', () => {
    // NOT THE BEST IMPLEMENTATION
    const argList = [];
    const callback = (...args) => {
        argList.push(args);
    }

    // Try to render component
    render(<UserForm onUserAdd={callback} />);

    // Find the two inputs
    const [nameInput, emailInput] = screen.getAllByRole('textbox');
    
    // Simulate typing in name input
    user.click(nameInput);
    user.keyboard('Jane');
    
    // Simulate typing in email input
    user.click(emailInput);
    user.keyboard('jane@gmail.com');
    
    // Find the button
    const button = screen.getByRole('button');

    // Simulate clicking the button
    user.click(button);

    // Assertion to make sure callback onUserAdd get called with name/email
    expect(argList).toHaveLength(1);
    expect(argList[0][0]).toEqual({ name: 'Jane', email: 'jane@gmail.com' });
});