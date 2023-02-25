FROM python:3.10

WORKDIR /app
COPY . .
RUN ls -la

WORKDIR /app/backend

RUN ls -la
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --dev --system --deploy
RUN pipenv install

EXPOSE 3001

CMD ["pipenv", "run", "python", "app.py"]