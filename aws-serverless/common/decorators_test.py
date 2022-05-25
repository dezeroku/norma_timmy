import decorators

@decorators.load_json_body
def _test_load_json_body(event, context):
    return event, context


def test_load_json_body():
    before = {'body': '{}'}
    after = ({'body': {}}, {})

    assert after == _test_load_json_body(before, {})

@decorators.load_json_body
def _test_load_json_body_type(event, context):
    return event, context


def test_load_json_body_type():
    before = {'body': '{}'}
    after = ({'body': {}}, {})

    assert type({}) == type(_test_load_json_body(before, {})[0]['body'])


@decorators.load_json_body
def _test_load_json_no_body(event, context):
    return event, context


def test_load_json_no_body():
    before = {}
    after = ({}, {})

    assert after == _test_load_json_no_body(before, {})
