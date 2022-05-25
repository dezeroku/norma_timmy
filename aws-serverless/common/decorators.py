import json

from lambda_decorators import before

@before
def load_json_body(event, context):
    if 'body' in event:
        if type(event['body']) == type(''):
            event['body'] = json.loads(event['body']) 
    return event, context

@before
def request_log(event, context):
    print(event)
    print(XD)
    return event, context
