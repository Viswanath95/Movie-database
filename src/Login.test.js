import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe("Tests for login form input fields", () => {
    beforeEach(() => {
        render(<Login/>)
    });

    it("Checks for input fields", () => {
        const email = screen.getByPlaceholderText("Enter Email")
        expect(email).toBeInTheDocument()
        expect(email).toHaveAttribute("type","email")
        const password = screen.getByPlaceholderText("Enter Password")
        expect(password).toBeInTheDocument()
        expect(password).toHaveAttribute("type","password")
    });

    it("Checks for a button", () => {
        const button = screen.getByText("LOGIN")
        expect(button).toBeInTheDocument()
    });

    it("Checks for empty email and password and display errors", () => {
        const emailInput = screen.getByPlaceholderText("Enter Email")
        const passwordInput = screen.getByPlaceholderText("Enter Password")
        const loginButton = screen.getByText("LOGIN");

        fireEvent.change(emailInput, { target: { value: ''} });
        fireEvent.change(passwordInput, { target: { value: ''} });
        fireEvent.submit(loginButton);

        const displayEmailError = screen.getByText('email is required')
        const displayPasswordError = screen.getByText('password is required')

        expect(displayEmailError).toBeInTheDocument();
        expect(displayPasswordError).toBeInTheDocument();
    });

    it("Checks for invalid email and password and display errors", () => {
        const emailInput = screen.getByPlaceholderText("Enter Email")
        const passwordInput = screen.getByPlaceholderText("Enter Password")
        const loginButton = screen.getByText("LOGIN");

        fireEvent.change(emailInput, { target: { value: 'test95@gmail.com'} });
        fireEvent.change(passwordInput, { target: { value: '95hello'} });
        fireEvent.submit(loginButton);

        const displayEmailError = screen.getByText('Type the correct email')
        expect(displayEmailError).toBeInTheDocument();
    });

    it("Checks for invalid email and valid password and display errors", () => {
        const emailInput = screen.getByPlaceholderText("Enter Email")
        const passwordInput = screen.getByPlaceholderText("Enter Password")
        const loginButton = screen.getByText("LOGIN");

        fireEvent.change(emailInput, { target: { value: 'test@gmail.com'} });
        fireEvent.change(passwordInput, { target: { value: '770nevergiveup'} });
        fireEvent.submit(loginButton);

        const displayEmailError = screen.getByText('Type the correct email')
        expect(displayEmailError).toBeInTheDocument();
    });

    it("Checks for valid email and invalid password and display errors", () => {
        const emailInput = screen.getByPlaceholderText("Enter Email")
        const passwordInput = screen.getByPlaceholderText("Enter Password")
        const loginButton = screen.getByText("LOGIN");

        fireEvent.change(emailInput, { target: { value: 'viswanathdev95@gmail.com'} });
        fireEvent.change(passwordInput, { target: { value: '95happens'} });
        fireEvent.submit(loginButton);

        const displayPasswordError = screen.getByText('password does not match with the entered email')
        expect(displayPasswordError).toBeInTheDocument();
    });

    it("Checks for form onsubmit", () => {
        const email = screen.getByPlaceholderText("Enter Email")
        userEvent.type(email,"viswanathdev95@gmail.com")
        expect(email).toHaveValue("viswanathdev95@gmail.com")

        const password = screen.getByPlaceholderText("Enter Password")
        userEvent.type(password,"770nevergiveup")
        expect(password).toHaveValue("770nevergiveup")

        const button = screen.getByRole("button", { name: /LOGIN/i })
        fireEvent.submit(button)

        const displaySuccessMsg = screen.getByText("You logged in successfully")
        expect(displaySuccessMsg).toBeInTheDocument();
    });
});

describe("Tests for conditional rendering", () => {

});