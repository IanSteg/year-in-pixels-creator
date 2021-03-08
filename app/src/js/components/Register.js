import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import withRedirect from '../util/react/WithRedirect';

import '../../css/Form.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
            validated: false,
            usernameTaken: false
        }
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onChangeUsername = async(e) => {
        this.setState({
            username: e.target.value
        });

        let username = e.target.value;
        if(username !== "") {
            let usernameAvailable = await this.props.checkUsernameAvailable(username);
            this.setState({
                usernameTaken: !usernameAvailable
            })
        }
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onChangeConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let form = e.currentTarget;

        if(this.state.password !== this.state.confirmPassword || this.state.usernameTaken) {
            return;
        }

        this.setState({
            validated: true
        });

        if(form.checkValidity() === true) {
            let success = await this.props.register(this.state.name, this.state.username, this.state.password);
            if(success) this.props.setRedirect("/");
        }
    }

    render() {
        return (
            <Container className="mt-3 form">
                <Card className="bg-light">
                    <Card.Header>
                        <h3 className="text-center">Register New Account</h3>
                    </Card.Header>
                    <Card.Body className="form-body mx-auto">
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FaUser></FaUser>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="First Name"
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                    />
                                </InputGroup>
                                <small className="form-text text-muted">You may leave this blank.</small>
                            </Form.Group>

                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FaUser></FaUser>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Username"
                                        type="text"
                                        required
                                        isInvalid={this.state.usernameTaken}
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                    />

                                    <FormControl.Feedback type="invalid">
                                        Username already taken / is empty.
                                    </FormControl.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <br></br>

                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FaLock></FaLock>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Password"
                                        type="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                    />

                                    <FormControl.Feedback type="invalid">
                                        Please choose a password.
                                    </FormControl.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FaLock></FaLock>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Confirm Password"
                                        type="password"
                                        required
                                        isInvalid={this.state.password !== this.state.confirmPassword}
                                        value={this.state.confirmPassword}
                                        onChange={this.onChangeConfirmPassword}
                                    />

                                    <FormControl.Feedback type="invalid">
                                        Passwords not entered / do not match.
                                    </FormControl.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <br></br>
                            <Button variant="primary" type="submit" block>
                                Submit
                            </Button>
                        </Form>

                        <p className="mt-3 text-center">Have an account? <Link to="/login">Log In</Link> </p>            
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default withRedirect(Register);
