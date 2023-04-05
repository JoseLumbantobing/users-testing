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
    // Mock (fake / doesn't do anything) function used when we need to make sure a component calls a callback
    const mock = jest.fn();

    // Try to render component
    render(<UserForm onUserAdd={mock} />);

    // Find the two inputs
    const nameInput = screen.getByRole('textbox', {
        name: /name/i,
    });
    const emailInput = screen.getByRole('textbox', {
        name: /email/i,
    });
    
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
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: 'Jane', email: 'jane@gmail.com' });
});