import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    requestName: '',
  };

  handleNameChange = event => {
    this.setState({ requestName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.requestName.trim() === '') {
      alert('Введите запрос');
      return;
    }
    this.props.onSubmitForm(this.state.requestName);
    this.setState({ requestName: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            value={this.state.requestName}
            autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
