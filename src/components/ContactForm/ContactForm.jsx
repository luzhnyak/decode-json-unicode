import React, { Component } from 'react';
import { Input, Button } from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onSubmit, isNameHas } = this.props;
    const { name } = this.state;

    if (isNameHas(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const data = {
      ...this.state,
    };

    onSubmit(data);

    this.reset();
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <Input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            required
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Number
          <Input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            required
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <Button type="submit">Add contact</Button>
      </form>
    );
  }
}
