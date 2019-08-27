from creds import getLogin
import virtru_tdf3_python as virtru


login = getLogin('virtru')
client = virtru.Client(*login)
# client = virtru.Client(login['user'], login['pass'])
