require 'httparty'


CLIENT_ID = "494745400143-ggt69ru9s24joh3ihik4psu91o74nlra.apps.googleusercontent.com"
CLIENT_SECRET = "7-8xV3iGpxeFnio-mEX7Y6B4"
STATE = SecureRandom.hex


get '/' do
  erb :index
end

get '/google_login' do
  session[:id] = nil
  google_url = "https://accounts.google.com/o/oauth2/auth?" +
                    "response_type=code&"+
                    "client_id=#{CLIENT_ID}&"+
                    "redirect_uri=http://radiant-harbor-3899.herokuapp.com/logged_in&"+
                    "scope=email%20profile&"+
                    "state=#{STATE}&" 
  redirect google_url
end

get '/logged_in' do
  access_code = params[:code]
  first_response = HTTParty.post("https://accounts.google.com/o/oauth2/token?", {body: {client_id: CLIENT_ID, client_secret: CLIENT_SECRET, redirect_uri: "http://radiant-harbor-3899.herokuapp.com/logged_in", grant_type:"authorization_code", code: access_code}})
  access_token = first_response["access_token"]
  user_info = HTTParty.get("https://www.googleapis.com/plus/v1/people/me?", {query: {access_token: access_token}})
  #check if their email is in the database, otherwise write them in. 
  email = user_info["emails"][0]["value"]
  if User.find_by_email(email).any?
    session[:id] = User.find_by_email(email).id
  else
    user = User.create(email: email)
    session[:id] = user.id
  end
  redirect '/'
end

get '/log_out' do
  #handle these with ajax requests??
  session[:id] = nil
end

get '/highscores' do
  users = User.all
  scores = users.map do |user|
    user.highscore
  end
  scores.sort!
  scores.reverse!
  @scores = scores.take(10)
  #sort the users by the highest of scores/ get the top 10. 
  erb :highscores
end

post '/highscores' do
  if session[:id]
    user = User.find(session[:id])
    if user.highscore < params[:highscore]
      user.highscore = params[:highscore]
    end
    user.highscore
  end
end


