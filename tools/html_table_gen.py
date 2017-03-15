lines = map(lambda x: x.strip(), open('../data/nba_salaries.tsv').readlines())
s = '<tr>'
for item in lines[0].split('\t'):
    s += '<th>'
    s += item
    s += '</th>'
s += '</tr>'
print s
lines = lines[1::]
for line in lines:
    s = '<tr>'
    for item in line.split('\t'):
        s += '<td>'
        s += item
        s += '</td>'
    s += '</tr>'
    print s