from os.path import splitext
import hashlib

#utils for upload
def upload_to_id_image(instance, filename):
    extension = splitext(filename)[1].lower()
    hashed =  hashlib.md5(str(instance.id).encode()).hexdigest()
    return '%(path)s/%(hp1)s/%(hp2)s/%(hash)s%(extension)s' % { 'path': 'img/exercise',
                                                                'hp1': hashed[:1],
                                                                'hp2': hashed[:2],
                                                                'hash': hashed[:16],
                                                                'extension': extension}