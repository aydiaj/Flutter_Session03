#!/usr/bin/env python3
"""Publish each public Session 03 example's main.dart to a separate GitHub Gist.

Usage:
  python3 tools/publish_gists.py             # dry run; show planned work
  GITHUB_TOKEN=... python3 tools/publish_gists.py --publish

The token needs GitHub Gists write access. Never put the token in a URL,
commit it, or share it in the classroom. Gists will be PUBLIC (as required
for DartPad access). Instructor solutions are not touched by this script.
"""
import argparse
import json
import os
from pathlib import Path
from urllib import request, error

ROOT=Path(__file__).resolve().parent.parent
EXAMPLES=ROOT/'examples'
CONFIG=ROOT/'js'/'gists.js'
KEYS=('hello', 'objects', 'inference', 'conversion', 'logic', 'ifelse', 'switches', 'switch_expr', 'loop_for', 'loop_while', 'loop_control', 'grade_demo')

def existing():
    raw=CONFIG.read_text()
    out={}
    import re
    for name,gid in re.findall(r"\b(\w+):\s*'([^']*)'",raw):out[name]=gid
    return out

def publish(name,token):
    source=(EXAMPLES/name/'main.dart').read_text()
    data=json.dumps({'description':f'SICT235 · Codelab 03 · {name} · public student starter',
                     'public':True,'files':{'main.dart':{'content':source}}}).encode()
    req=request.Request('https://api.github.com/gists',data=data,
        headers={'Authorization':f'Bearer {token}','Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',
                 'User-Agent':'SICT235-Gist-Publisher','Content-Type':'application/json'},method='POST')
    try:
        with request.urlopen(req,timeout=25) as resp:
            result=json.load(resp)
    except error.HTTPError as e:
        raise RuntimeError(f'Publishing {name} failed: HTTP {e.code}. Verify token permissions and GitHub access.') from e
    gid=result.get('id')
    if not gid:raise RuntimeError(f'GitHub response omitted Gist ID for {name}')
    print(f'  ✓ {name}: https://gist.github.com/{gid}')
    return gid

def write_config(ids):
    lines=['// GENERATED after Gist publishing. Do not include personal access tokens here.',
           '// This file is public: it contains only IDs of PUBLIC Gists.',
           'window.DART_GISTS = {']
    lines.extend(f"  {key}: '{ids.get(key,'')}'," for key in KEYS)
    lines.extend(['};',''])
    CONFIG.write_text('\n'.join(lines))


def main():
    p=argparse.ArgumentParser(description='Publish independent DartPad-compatible Gists')
    p.add_argument('--publish',action='store_true',help='Create public Gists (default: dry-run)')
    p.add_argument('--recreate',action='store_true',help='Publish Gists again instead of reusing configured IDs')
    a=p.parse_args()
    current=existing()
    print('Session 03 Gist publishing plan:')
    for key in KEYS:
        status='already configured' if current.get(key) and not a.recreate else 'create public Gist'
        print(f'  {key}: {status} (from examples/{key}/main.dart)')
    if not a.publish:
        print('\nDry run only. For actual publishing set GITHUB_TOKEN and add --publish.')
        return
    token=os.getenv('GITHUB_TOKEN') or os.getenv('GH_TOKEN')
    if not token:
        raise SystemExit('ERROR: Missing GITHUB_TOKEN or GH_TOKEN with GitHub Gists write access.')
    for key in KEYS:
        if current.get(key) and not a.recreate:continue
        current[key]=publish(key,token)
        write_config(current)  # Save each successful publication to support safe retries.
    print('\nGist IDs saved in js/gists.js. For standalone HTML regenerate: python3 tools/build_standalone.py')

if __name__=='__main__':main()
