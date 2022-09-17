# CRS Backend

## How to Start the Development Server?
```bash
cd backend
pip install pipenv # install pipenv
pipenv install # use pipenv to install packages
pipenv run python app.py   # run the program
```
## How to Start the Production Server? 
```bash
cd backend
docker build . -t crs-backend
docker run -p "5000:5000" -d crs-backend
```