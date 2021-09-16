import datetime
import logging
from werkzeug.utils import secure_filename
import os
import boto3
import botocore
from botocore.config import Config
from botocore.exceptions import ClientError

"""
AWS CONFIGURATION
"""
# AWS_ACCESS_KEY_ID= os.environ.get('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY= os.environ.get('AWS_SECRET_ACCESS_KEY')
BUCKET_NAME='whereaboutsbucket'


# my_config = Config(
#     region_name =  REGION_NAME

# )

def upload_to_aws(image_set, bucket, userId):

    aws_object = f"UserId:{userId}-"+str(int(datetime.datetime.now().timestamp()))
        # Upload the file
    s3_client = boto3.client('s3')
    try:
        imgUrls =[]
        for image in image_set:
            img_name = secure_filename(image.filename)
            image.save(img_name)
            s3_client.upload_file(
            img_name,
            bucket,
            img_name,
            ExtraArgs={'ACL': 'public-read'}
            )
            config = botocore.client.Config(signature_version=botocore.UNSIGNED)
            object_url = str("https://whereaboutsbucket.s3.amazonaws.com/"+f"{img_name}")
            imgUrls.append(object_url)
            os.remove(img_name)
        print(imgUrls,"<<<<<<<<IMG_URLS")
        print(len(imgUrls),"<<<<<<<<NUMBER OF FILES")
        return imgUrls

    except ClientError as e:
        logging.error(e)
        return False
