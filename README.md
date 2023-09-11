# Django & React Tasks Application

## Usage - Backend

Windows:

```bash
# Clone this repository
$ git clone https://github.com/danilaveselov/django-react-tasks.git

# Create a new virtual environment
$ py -3 -m venv .venv

# Activate your virtual environment
$ .venv\Scripts\activate

# Install required requirements
$ pip install -r requirements.txt

# Run the migrations
$ python backend\manage.py migrate

# Run the project with
$ python backend\manage.py runserver
```

MacOS/Linux:

```bash
# Clone this repository
$ git clone https://github.com/danilaveselov/django-react-tasks.git

# Create a new virtual environment
$ python3 -m venv .venv

# Activate your virtual environment
$ .venv/bin/activate

# Install required requirements
$ pip install -r requirements.txt

# Run the migrations
$ python backend/manage.py migrate

# Run the project with
$ python backend/manage.py runserver
```

Testing:

```bash
# Run these commands inside backend folder

# flake8 testing to maintain code quality and follow PEP8 guidelines 
$ flake8

# Unit tests
$ python manage.py test
```

## Usage - Frontend


```bash
# Navigate inside frontend directory
$ cd frontend

# Install the packages
$ yarn install

# Start the application
$ yarn start
```

## Functionality Overview
![image](https://github.com/danilaveselov/django-react-tasks/assets/86387035/976dba0e-7209-47b4-b0d8-fa3c37336ac6)


## Demo Showcase
A brief overview of display features and how tiles get ordered by launch date.
![appoverview](https://github.com/danilaveselov/django-react-tasks/assets/86387035/489b1092-d37e-4378-9ae5-27ed293f63f8)

Creating, editing and deleting a tile.
![appoverview1](https://github.com/danilaveselov/django-react-tasks/assets/86387035/60c3ea3a-f84d-4089-9de8-930e5557b6da)

Creating tasks within a tile with different order values.
![appoverview2](https://github.com/danilaveselov/django-react-tasks/assets/86387035/582b114b-f223-4479-8e67-3f11564cc79d)
